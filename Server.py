'''
Created on Sep 21, 2016

@author: Nikola

Created at the University of Manchester, School of Computer Science
Licence GNU/GPL 3.0
'''
from flask import Flask
from flask import request
import MySQLdb as mdb
import sys
import json
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/submitannotation', methods = ['POST'])
def submit_annotation():
    data = ""
    jso = ""
    try:
        data = request.data
        
        jso = json.loads(data)
        con = mdb.connect('localhost', 'root', '', 'richannotator');
        cur = con.cursor()
        doc_xml = jso['xml']
        doc_source = jso['source']
        doc_source_id = jso['source_id']
        
        document_id = -1 #To be obtained
        user_id = 1 # To be obtained
        user_token = jso['token'] #''  To be generated in other method and transfer
        user_id = jso['user_id']
        select_doc_id = "Select idArticle from Article where Source='%s' and SourceId='%d'"
        cur.execute(select_doc_id % \
                    (doc_source,doc_source_id))
        results = cur.fetchall()
        for row in results:
            document_id = row[0]
        if(document_id == -1):
            insert_doc = "Insert into article (Source,SourceId,XML) Values ('%s','%s','%s')"
            cur.execute(insert_doc % (doc_source,doc_source_id,doc_xml))
            con.commit()
            #cur.commit()
            document_id = cur.lastrowid
        if('relations' in jso.keys()):
            denotations = jso['denotations']
            for den in denotations:
                ann_xpath = den['xpath']
                ann_type = 'denotation'
                ann_idLabel = den['id']
                if('subj' not in den.keys()):
                    ann_subj = 'None'
                else:
                    ann_subj = den['subj']
                if('pred' not in den.keys()):
                    ann_pred = 'None'
                else:    
                    ann_pred = den['pred']
                if('obj' not in den.keys()):
                    ann_obj = 'None'
                else:    
                    ann_obj = den['obj']
        #ToDo: Check token
                insert_annotations_sql = "Insert into Annotation (XPath,type,idLabel,subj,pred,obj,Article_idArticle,User_idUser) VALUES ('%s','%s','%s','%s','%s','%s',%d,%d)"
                cur.execute(insert_annotations_sql % \
                    (ann_xpath,ann_type,ann_idLabel,ann_subj,ann_pred,ann_obj,document_id,user_id))
                con.commit()       
        if('relations' in jso.keys()):
            relations = jso['relations']
            for den in relations:
                ann_xpath = ''
                ann_type = 'relation'
                ann_idLabel = den['id']
                if('subj' not in den.keys()):
                    ann_subj = 'None'
                else:
                    ann_subj = den['subj']
                if('pred' not in den.keys()):
                    ann_pred = 'None'
                else:    
                    ann_pred = den['pred']
                if('obj' not in den.keys()):
                    ann_obj = 'None'
                else:    
                    ann_obj = den['obj']
        #ToDo: Check token
                insert_annotations_sql = "Insert into Annotation (XPath,type,idLabel,subj,pred,obj,Article_idArticle,User_idUser) VALUES ('%s','%s','%s','%s','%s','%s',%d,%d)"
                cur.execute(insert_annotations_sql % \
                    (ann_xpath,ann_type,ann_idLabel,ann_subj,ann_pred,ann_obj,document_id,user_id))
                con.commit()
        if('modifications' in jso.keys()):
            modifications = jso['modifications']
            for den in modifications:
                ann_xpath = ''
                ann_type = 'modification'
                ann_idLabel = den['id']
                if('subj' not in den.keys()):
                    ann_subj = 'None'
                else:
                    ann_subj = den['subj']
                if('pred' not in den.keys()):
                    ann_pred = 'None'
                else:    
                    ann_pred = den['pred']
                if('obj' not in den.keys()):
                    ann_obj = 'None'
                else:    
                    ann_obj = den['obj']
        #ToDo: Check token
                insert_annotations_sql = "Insert into Annotation (XPath,type,idLabel,subj,pred,obj,Article_idArticle,User_idUser) VALUES ('%s','%s','%s','%s','%s','%s',%d,%d)"
                cur.execute(insert_annotations_sql % \
                    (ann_xpath,ann_type,ann_idLabel,ann_subj,ann_pred,ann_obj,document_id,user_id))
                con.commit() 
    except Exception, e:
        print ('Failed!!: '+ str(e))
        
    return 'Hello, World!Annotations:'+jso["text"]



if __name__ == "__main__":
    app.run()