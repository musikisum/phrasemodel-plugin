// Check if the voices of a model can be converted into a playable array.
export function validateModel(model) {
  // Check if the number of scale degrees in each voice is the same.
  const number = model.voiceUpper.length;
  if (model.voiceInner.length !== number && model.voiceLower.length !== number) {
    throw new Error('Invalid number of tones in one or more phrase model voices');
  }
  // Check if the model has at least two chords.
  if (number < 2) {
    throw new Error('A chord is not a phrase model');
  }
}