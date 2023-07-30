// PhraseModel Class

class PhraseModel {
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.voiceUpper = model.voiceUpper;
    this.voiceInner = model.voiceInner;
    this.voiceLower = model.voiceLower;
    this.defaultValue = model.defaultValue;
  }

  getChords() {
    return this.voiceUpper.reduce((akku, item, index) => {
      akku.push([item, this.voiceInner[index], this.voiceLower[index], this.defaultValue]);
      return akku;
    }, []);
  }
}

const modelProtoA = {
  name: '',
  displayName: 'Initialmodell',
  description: 'Erklingt meistens am Anfang eines musikalischen Abschnitts.',
  voiceUpper: ['g', 'f', 'f', 'e'],
  voiceInner: ['e', 'd', 'd', 'c'],
  voiceLower: ['C', 'C', 'B,', 'C'],
  defaultValue: 2
};

const modelProtoB = {
  name: '',
  displayName: 'Quintfallsequenz',
  description: 'Erklingt gefühlt in 50% der Musik des 17. und 18. Jahrhunderts.',
  voiceUpper: ['g', 'a', 'a', 'g', 'g', 'f', 'f', 'e'],
  voiceInner: ['e', 'e', 'd', 'd', 'c', 'c', 'B', 'c'],
  voiceLower: ['C', 'F,', 'B,', 'E,', 'A,', 'D,', 'G,', 'C,'],
  defaultValue: 2
};

// Check if the voices of a model can be converted into a playable array.
function validateModel(model) {
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

// Compares two arrays and returns arrays with indices for duplicate scale degrees.
function arrayComparer(arr1, arr2) {
  if (typeof arr2 === 'undefined') {
    return [];
  }
  const indices = [];
  for (let i = 0; i < arr1.length - 1; i += 1) {
    const contains = arr2.indexOf(arr1[i]);
    if (contains > -1) {
      indices.push([i, contains]);
    }
  }
  return indices;
}

// Filter to remove special values
function removeSpecialValuesFromArray(chord, valueToDelete) {
  return chord.filter(scaleDegree => scaleDegree !== valueToDelete);
}

const testModel1 = new PhraseModel(modelProtoA);
const testModel2 = new PhraseModel(modelProtoB);

const specialValue = null;

// Generate an array for tonejs playback function
function getPlayableArray(model) {

  // Valdidate phrase model voices
  validateModel(model);

  const numberOfScaleDegrees = model.voiceUpper.length;
  const defaultValue = model.defaultValue;

  // Replace scale degree repetitions
  const chordsArr = testModel2.getChords();
  const playArrs = [];
  let indexChord;
  let nextIndexChord;
  for (let i = 0; i < numberOfScaleDegrees; i += 1) {
    if (i + 1 < numberOfScaleDegrees) {
      indexChord = chordsArr[i];
      nextIndexChord = chordsArr[i + 1];
      const indices = arrayComparer(indexChord, nextIndexChord);
      if (indices.length) {
        // split and store arrays, if scale degree repetitions has matched
        const tempChord = [defaultValue * 2];
        for (let y = 0; y < indices.length; y += 1) {
          tempChord.unshift(indexChord[indices[y][0]]);
          indexChord[indices[y][0]] = null;
          nextIndexChord[indices[y][1]] = null;
        }
        playArrs.push([tempChord, removeSpecialValuesFromArray(indexChord, specialValue)]);
        nextIndexChord = removeSpecialValuesFromArray(nextIndexChord, specialValue);
      } else {
        // store copy of indexChord, if no value matched
        playArrs.push([[...removeSpecialValuesFromArray(indexChord, specialValue)]]);
      }
    } else {
      playArrs.push([chordsArr[i]]);
    }
  }
  // console.log(modelA);
  // console.log(playArrs);
  return playArrs;
}

// Exporting the models and the function to create playable arrays from model voices.
export const Models = {
  Initialkadenz: testModel1,
  Quintfallsequenz: testModel2,
  getPlayableArray
};
