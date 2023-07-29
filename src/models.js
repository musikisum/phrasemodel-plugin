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
  const numberOfNotes = model.voiceUpper.length;
  const defaultValue = model.defaultValue;
  if (model.voiceInner.length !== numberOfNotes && model.voiceLower.length !== numberOfNotes) {
    throw new Error('Invalid number of tones in one or more phrase model voices');  
  }
  if (numberOfNotes < 2) {
    throw new Error('A Chord is not a phrase model');
  }
  const chordsArr = [];
  for (let i = 0; i < numberOfNotes; i++) {
    chordsArr.push([
      model.voiceUpper[i],
      model.voiceInner[i],
      model.voiceLower[i],
      model.defaultValue
    ]);    
  }
  // Generate playable arrays
  const playArrs = [];
  let indexArr, lookUpArr, tempArr;
  for (let i = 0; i < numberOfNotes; i++) {
    if(i + 1 < numberOfNotes) {
      indexArr = chordsArr[i];
      lookUpArr = chordsArr[i+1];      
      const values = arrayComparer(indexArr, lookUpArr);
      if (values) {
        // store two arrays, if value matched
        tempArr = indexArr.splice(values.arr1Index, 1).slice();
        tempArr.push(defaultValue * 2);
        playArrs.push([tempArr, indexArr.slice()]); 
        // delete matched entry in next loop
        lookUpArr.splice(values.arr2Index, 1);             
      } else {
        // store copy of indexArr, if now value matched
        playArrs.push([indexArr.slice()])
      }   
    } else {
      playArrs.push([chordsArr[chordsArr.length - 1]]);
    }
  }
  console.log(modelB);
  console.log(playArrs);
  return playArrs;
};

// Compares two arrays and returns an array of indices for the values. 
function arrayComparer(arr1, arr2) {  
  const indices = {}
  for (let i = 0; i < arr1.length - 1; i++) {
    const value = arr1[i];
    const contains = arr2.indexOf(value);
    if (contains > -1) {
      indices.arr1Index = i;
      indices.arr2Index = contains;
      return indices;
    }    
  }
  return null;  
}

export const Models = {
  Initialkadenz: modelProtoA,
  Quintfallsequenz: modelProtoB,
  GetPlayableArray: getPlayableArray
}
