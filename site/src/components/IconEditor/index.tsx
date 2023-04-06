import { Box, Flex } from '@chakra-ui/react';
import memoize from 'lodash/memoize';
import Editor from 'react-simple-code-editor';
import SvgPreview from 'src/components/SvgPreview';
import highlight from './highlight';

const mHighlight = memoize(highlight);

const iconStyling = {
  height: 'min-content',
  width: '25vw',
  minWidth: '480px',
  maxWidth: '840px',
};

type IconEditorProps = {
  value: string;
  onChange: (value: string) => void;
};
const IconEditor = ({ value, onChange }: IconEditorProps) => {
  return (
    <Flex>
      <Box style={iconStyling} className="icon-large">
        <SvgPreview src={value} showGrid />
      </Box>
      <Editor
        value={value}
        onValueChange={onChange}
        style={{
          height: '100%',
          width: '100%',
          minWidth: '480px',
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
        padding={12}
        highlight={mHighlight}
      />
      <style>{'textarea.npm__react-simple-code-editor__textarea:focus { outline: none }'}</style>
    </Flex>
  );
};

export default IconEditor;
