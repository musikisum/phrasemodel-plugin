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

// TODO Implement algorithm to generate an array for Playback function

function getPlayableArray(model) {
  const numberOfNotes = model.voiceUpper.length;
  if (model.voiceInner.length !== numberOfNotes && model.voiceLower.length !== numberOfNotes) {
    throw new Error('Invalid number of tones in one or more phrase model voices');  
  }
  const playArrs = [];
  for (let i = 0; i < numberOfNotes; i++) {    
    let test = splitArrays(model.voiceUpper[i], model.voiceInner[i], model.voiceLower[i], model.defaultValue);
    playArrs.push([test]);
  }
  return playArrs;
};

// TODO Create for double entries playable arrays  
function splitArrays(voiceUpper, voiceInner, voiceLower, duration) {
  return [voiceUpper, voiceInner, voiceLower, duration];
}

const modelB = [
  [['g', 'e', 'C', 2]],
  [['a', 4], ['e', 'F,', 2]],
  [['d', 'B,', 2]],
  [['g', 4], ['d', 'E,', 2]],
  [['c', 'A,', 2]],
  [['f', 4], ['c', 'D,', 2]],
  [['B', 'G,', 2]],
  [['e', 'c', 'C,', 2]]
]

const modelC = {
  0: 'e2 | d4 | c4 | B2',
  1: 'G2 | ^F2  G2 | G2 ^F2 | G2',
  2: 'C,2 | C,2 B,2 | A,2 D,2 | G,2'
}

const modelD = {
  0: 'B2 | A4 | B2',
  1: 'G2 | G2 ^F2 | G2',
  2: 'B,,2 | C,2 D,2 | G,2'
}

export const Models = {
  Initialkadenz: modelProtoA,
  Quintfallsequenz: modelProtoB,
  playableArr: getPlayableArray
}
