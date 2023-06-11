/* eslint-disable no-console */
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import { PlusOutlined } from '@ant-design/icons';
import { useToneJsSampler } from './scripts/hooks.js';
import React, { useEffect, useState, useRef } from 'react';
// import Logger from '@educandu/educandu/common/logger.js';
import { getMidiValueFromAbcNoteName } from './scripts/utils.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

// const logger = new Logger(import.meta.url);

export default function PhraseModelsDisplay({ content }) {

  // Custom hooks returning state/ref variables
  const [sampler, toneNs] = useToneJsSampler(); // [ref, state]

  const [timeLineObj, setTimeLineObj] = useState(null);

  const playTimeLineObjRef = useRef(null);

  const { t } = useTranslation('musikisum/educandu-plugin-phrase-models');

  const timeValue = 0.5;

  const handlePlayButtonClick = () => {
    playTimeLineObjRef.current();
  };

  useEffect(() => {

    if (!toneNs) {
      return;
    }

    function noteToFreq(note, halfTones = 0) {
      return toneNs.Frequency(note, 'midi').transpose(halfTones);
    }

    function convertAbcArrToFreqArr(arrays) {
      return arrays.map(array => array.map(value => noteToFreq(getMidiValueFromAbcNoteName(value))));
    }
    setTimeLineObj({
      current: {
        0: {
          arrays: convertAbcArrToFreqArr([['g', 'e', 'C']]),
          durations: [2]
        },
        1: {
          arrays: convertAbcArrToFreqArr([['f', 'd'], ['C']]),
          durations: [4, 2]
        },
        2: {
          arrays: convertAbcArrToFreqArr([['B,']]),
          durations: [2]
        },
        3: {
          arrays: convertAbcArrToFreqArr([['e', 'c', 'C']]),
          durations: [2]
        }
      }
    });

  }, [toneNs]);

  useEffect(() => {

    if (!timeLineObj) {
      return;
    }

    playTimeLineObjRef.current = async () => {
      const objVals = Object.values(timeLineObj.current);

      for (let i = 0; i < objVals.length; i += 1) {
        let index = 0;
        const obj = objVals[i];

        while (index < objVals[i].arrays.length) {
          sampler.current.triggerAttackRelease(obj.arrays[index], timeValue * obj.durations[index]);
          index += 1;
        }

        await new Promise(res => {
          setTimeout(() => {
            res();
          }, 1000);
        });
      }
    };

  }, [timeLineObj, sampler]);

  return (
    <div className="EP_Educandu_Phrase_Models_Display">
      <div>{t('name')}</div>
      <Button id="btn" type="primary" icon={null} onClick={handlePlayButtonClick}>
        Play!
      </Button>
    </div>
  );
}

PhraseModelsDisplay.propTypes = {
  ...sectionDisplayProps
};
