# Speech-Emotion-Recognition
A functionality to predict emotion conveyed by human speech in form of audio clip.
A CNN based deep learning model implemented using Keras is used to make predictions.
Mfcc features are used for training the model.
The model is first trained on the RAVDESS dataset in python and the trained model is loaded in the backend using TensorFlow.js.

#Emotions in the RAVDESS dataset
emotions={
  '01':'neutral',
  '02':'calm',
  '03':'happy',
  '04':'sad',
  '05':'angry',
  '06':'fearful',
  '07':'disgust',
  '08':'surprised'
}
