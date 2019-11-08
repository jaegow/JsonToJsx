// import CheckboxGroup from ;
import RadioGroup from '../Form/RadioGroup';
import Select from '../Form/Select';
import TextInput from '../Form/TextInput';
import { buildLoggers } from '../../utils/log';

const { log, todo } = buildLoggers('ComponentRenderer');

todo('look into dynamic component imports through http');
todo('possibly component manifest to load a list of available components');

const componentMap = {
  CheckboxGroup: import('../Form/CheckboxGroup'),
  RadioGroup,
  Select,
  TextInput,
};

const byName = (componentName) => componentMap[componentName];

export default {
  byName,
  // byUrl,
};

export { componentMap };
