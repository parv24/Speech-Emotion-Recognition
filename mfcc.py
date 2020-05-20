import sys
import librosa
import numpy as np

def extract_feature(file_name):
    X, sample_rate = librosa.load(file_name)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate,n_mfcc=40).T, axis=0)
    x=[]
    x.append(mfccs)
    x= np.expand_dims(x, axis=2)
    return x

pred = extract_feature(sys.argv[1])
ans=""
for f in pred[0]:
    ans=ans+str(f[0])+"/"
print(ans[:len(ans)-1])
sys.stdout.flush()
