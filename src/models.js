// Modells
const modelProtoA = {
  name: '',
  displayName: 'Initialmodell',
  description: 'Erklingt meistens am Anfang eines musikalischen Abschnitts.',
  voiceUpper: ['g', 'f', 'f', 'e'],
  voiceInner: ['e', 'd', 'd', 'c'],
  voiceLower: ['C', 'C', 'B,', 'C'],
  defaultValue: 2
}

const modelProtoB = {
  name: '',
  displayName: 'Quintfallsequenz',
  description: 'Erklingt gefühlt in 50% der Musik des 17. und 18. Jahrhunderts.',
  voiceUpper: ['g', 'a', 'a', 'g', 'g', 'f', 'f', 'e'],
  voiceInner: ['e', 'e', 'd', 'd', 'c', 'c', 'B', 'c'],
  voiceLower: ['C', 'F,', 'B,', 'E,', 'A,', 'D,', 'G,', 'C,'],
  defaultValue: 2
}

// Playable arrays for testing the getPlayableArray function
const modelA = [
  [['C', 4], ['g', 'e', 2]],
  [['f', 'd', 4]],
  [['B,', 2]],
  [['e', 'c', 'C', 2]]
]

const modelB = [
  [['e', 4], ['g', 'C', 2]],
  [['a', 4], ['F,', 2]],
  [['d', 4], ['B,', 2]],
  [['g', 4], ['E,', 2]],
  [['c', 4], ['A,', 2]],
  [['f', 4], ['D,', 2]],
  [['B', 'G,', 2]],
  [['e', 'c', 'C,', 2]]
]

// Generate an array for tonejs playback function
function getPlayableArray(model) {

  // Valdidate phrase model voices 
  validateModel(model); 

  const numberOfScaleDegrees = model.voiceUpper.length;
  const defaultValue = model.defaultValue;  
  const chordsArr = [];

  // Convert model voices in playable arrays of chords 
  for (let i = 0; i < numberOfScaleDegrees; i++) {
    chordsArr.push([
      model.voiceUpper[i],
      model.voiceInner[i],
      model.voiceLower[i],
      model.defaultValue
    ]);    
  }

// Replace scale degree repetitions 
const playArrs = [];
let indexChord, nextIndexChord, tempChord;
for (let i = 0; i < numberOfScaleDegrees; i++) {
  if(i + 1 < numberOfScaleDegrees) {
    indexChord = chordsArr[i];
    nextIndexChord = chordsArr[i+1];      
    const indices = arrayComparer(indexChord, nextIndexChord);
    if (indices.length) {
      // split and store arrays, if scale degree repetitions has matched
      for (let y = 0; y < indices.length; y++) {
        const indexChordCopyWithspecialValues = indexChord.slice();
        
        // Save playable item 
        tempChord = indexChord.splice(indices[y][0], 1).slice();
        nextIndexChord.splice(indices[y][1], 1);          
        // delete matched entries in the current an next chord
        tempChord.push(defaultValue * 2);
        playArrs.push([tempChord, indexChord.slice()]);
      }                
    } else {
      // store copy of indexChord, if no value matched
      playArrs.push([indexChord.slice()])
    }   
  } else {
    playArrs.push([chordsArr[chordsArr.length - 1]]);
  }
}
console.log(modelB);
console.log(playArrs);
return playArrs;
};

// Compares two arrays and returns arrays with indices for duplicate scale degrees. 
function arrayComparer(arr1, arr2) {  
  const indices = [];
  for (let i = 0; i < arr1.length - 1; i++) {
    const contains = arr2.indexOf(arr1[i]);
    if (contains > -1) {
      indices.push([i, contains])
    }    
  }
  return indices;  
}

// Filter to remove special values
function removeSpecialValuesFromArray(chord, specialValue) {
  return chord.filter(scaleDegree => scaleDegree !== specialValue);
} 

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

// Exporting the models and the function to create playable arrays from model voices. 
export const Models = {
  Initialkadenz: modelProtoA,
  Quintfallsequenz: modelProtoB,
  GetPlayableArray: getPlayableArray
}
