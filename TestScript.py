'''
Created on Sep 21, 2016

@author: Nikola

Created at the University of Manchester, School of Computer Science
Licence GNU/GPL 3.0
'''
import json
data = '{"text": "IRF-4 expression in CML may be induced by IFN-alfa therapy","denotations": [{"id": "T1", "span": {"begin": 0, "end": 5}, "obj": "Protein"},{"id": "T2", "span": {"begin": 42, "end": 47}, "obj": "Protein"},{"id": "E1", "span": {"begin": 6, "end": 16}, "obj": "Expression"},{"id": "E2", "span": {"begin": 31, "end": 38}, "obj": "Regulation"}],"relations": [{"id": "R1", "subj": "T1", "pred": "themeOf", "obj": "E1"},{"id": "R2", "subj": "E1", "pred": "themeOf", "obj": "E2"},{"id": "R3", "subj": "T2", "pred": "causeOf", "obj": "E2"}],"modifications": [{"id": "M1", "pred": "Speculation", "obj": "E2"}]}'
jso = json.loads(data)
print jso["denotations"] 