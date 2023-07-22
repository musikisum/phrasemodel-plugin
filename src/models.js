export const ModelProtoA = {
  name: '',
  displayName: '',
  description: '',
  voiceUpper: ['e2', 'd4', 'c2'],
  voiceInner: ['g2', 'f4', 'e2'],
  voiceLower: ['C2', 'C2', 'B2', 'C2']
}

// TODO Implement algorithm to generate an array for Playback function    

export const ModelA = [
  [['g', 'e', 'C', 2]],
  [['f', 'd', 4], ['C', 2]],
  [['B,', 2]],
  [['e', 'c', 'C', 2]]
]

export const ModelB = [
  [['g', 'e', 'C', 2]],
  [['a', 4], ['e', 'F,', 2]],
  [['d', 'B,', 2]],
  [['g', 4], ['d', 'E,', 2]],
  [['c', 'A,', 2]],
  [['f', 4], ['c', 'D,', 2]],
  [['B', 'G,', 2]],
  [['e', 'c', 'C,', 2]]
]

export const ModelC = {
  0: 'e2 | d4 | c4 | B2',
  1: 'G2 | ^F2  G2 | G2 ^F2 | G2',
  2: 'C,2 | C,2 B,2 | A,2 D,2 | G,2'
}

export const ModelD = {
  0: 'B2 | A4 | B2',
  1: 'G2 | G2 ^F2 | G2',
  2: 'B,,2 | C,2 D,2 | G,2'
}
