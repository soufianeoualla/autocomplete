# Autocomplete

A customizable autocomplete component built using React, Tailwind CSS and MUI Base. It provides a dropdown list of options that users can filter by typing in an input field. 
## Installation

To set up this project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/soufianeoualla/autocomplete
cd autocomplete
npm install
```

## Development

```bash
npm run dev
```

## Usage

```javascript
import { useState } from 'react';
import { Autocomplete } from './Autocomplete';

const fruits= [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const Example = () => {
  const [value, setValue] = useState(null);

  const getOptionLabel = (option) => option.label;

  return (
    <Autocomplete
      options={fruits}
      setValue={setValue}
      getOptionLabel={getOptionLabel}
      
    />
  );
};

export default Example;
```

## Props

#### options
Type: array (required)

Description: The options to display in the dropdown. Each option is an object that should contain a label and a value.

#### setValue
Type: func (required)

Description: Function to set the selected value. It is called with the new value when the selection changes.

#### getOptionLabel

Type: func (required)

Description: A function to get the display label for an option. It takes an option as a parameter and returns a string.

#### disableClearable
Type: boolean

Default: false

Description: If true, the clear icon will not be shown.
#### disabled
Type: boolean

Default: false
Description: If true, the input field will be disabled.
#### readOnly
Type: boolean

Default: false

Description: If true, the input field will be read-only.

