import Models from './models.js';
import React, { useState } from 'react';
import { Form, TreeSelect } from 'antd';
import { useTranslation } from 'react-i18next';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function PhraseModelsEditor({ content, onContentChanged }) {
  const { t } = useTranslation('musikisum/educandu-plugin-phrase-models');
  const { text } = content;
  const [value, setValue] = useState();

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const handleTextChanged = event => {
    updateContent({ text: event.target.value });
  };

  const handleModelSelectionChange = newValue => {
    setValue(newValue);
    updateContent({ phraseModels: newValue });
  };

  const treeData = Object.values(Models).map(model => {
    console.log(model.name);
    return { value: model.name, title: model.displayName };
  });

  return (
    <div className="EP_Educandu_Phrase_Models_Editor">
      <Form labelAlign="left">
        <Form.Item label={t('common:text')} {...FORM_ITEM_LAYOUT}>
          <MarkdownInput value={text} onChange={handleTextChanged} renderAnchors />
        </Form.Item>
        <Form.Item label="selector" {...FORM_ITEM_LAYOUT}>
          <TreeSelect
            showSearch
            style={{
              width: '100%'
            }}
            value={value}
            defaultValue={content.phraseModels || []}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto'
            }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={handleModelSelectionChange}
            treeData={treeData}
            />
        </Form.Item>
      </Form>
    </div>
  );
}

PhraseModelsEditor.propTypes = {
  ...sectionEditorProps
};
