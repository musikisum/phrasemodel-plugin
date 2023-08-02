import joi from 'joi';
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { couldAccessUrlFromRoom } from '@educandu/educandu/utils/source-utils.js';
import GithubFlavoredMarkdown from '@educandu/educandu/common/github-flavored-markdown.js';

class PhraseModelsInfo {
  static dependencies = [GithubFlavoredMarkdown];

  static typeName = 'musikisum/educandu-plugin-phrase-models';

  constructor(gfm) {
    this.gfm = gfm;
  }

  getDisplayName(t) {
    return t('musikisum/educandu-plugin-phrase-models:name');
  }

  getIcon() {
    return <ClockCircleOutlined />;
  }

  async resolveDisplayComponent() {
    return (await import('./phrase-models-display.js')).default;
  }

  async resolveEditorComponent() {
    return (await import('./phrase-models-editor.js')).default;
  }

  getDefaultContent() {
    return {
      text: '',
      phraseModels: []
    };
  }

  validateContent(content) {
    const schema = joi.object({
      text: joi.string().allow('').required(),
      phraseModels: joi.array().required()
    });

    joi.attempt(content, schema, { abortEarly: false, convert: false, noDefaults: true });
  }

  cloneContent(content) {
    return cloneDeep(content);
  }

  redactContent(content, targetRoomId) {
    const redactedContent = cloneDeep(content);

    redactedContent.text = this.gfm.redactCdnResources(
      redactedContent.text,
      url => couldAccessUrlFromRoom(url, targetRoomId) ? url : ''
    );

    return redactedContent;
  }

  getCdnResources(content) {
    return this.gfm.extractCdnResources(content.text);
  }
}

export default PhraseModelsInfo;
