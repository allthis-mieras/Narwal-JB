import schemaContentTypes from './contentTypes/index';
import schemaElements from './elements/index';
import schemaSectionBlocks from './sectionBlocks/index';


export const schemaTypes = [
  ...schemaContentTypes,
  ...schemaElements,
  ...schemaSectionBlocks,
];