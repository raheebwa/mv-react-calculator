import React from 'react';
import Button from './Button';

const buttonsProps = [
  { key: 1, name: 'AC' },
  { key: 2, name: '+/-' },
  { key: 3, name: '%' },
  { key: 4, name: '÷' },
  { key: 5, name: '7' },
  { key: 6, name: '8' },
  { key: 7, name: '9' },
  { key: 8, name: 'X' },
  { key: 9, name: '4' },
  { key: 10, name: '5' },
  { key: 11, name: '6' },
  { key: 12, name: '-' },
  { key: 13, name: '1' },
  { key: 14, name: '2' },
  { key: 15, name: '3' },
  { key: 16, name: '+' },
  { key: 17, name: '0' },
  { key: 18, name: '.' },
  { key: 19, name: '=' },
];

const btnColor = '#E3E1DE';
const buttons = buttonsProps.map((prop, i) => {
  const props = { ...prop, width: false, color: btnColor };

  if ((i + 1) % 4 === 0 || prop.key === 19) {
    delete props.color;
  } else if (prop.name === '0') {
    props.width = true;
  }

  return (
    <Button key={props.key} name={props.name} width={props.width} color={props.color} />
  );
});

const buttonGroups = [
  { key: 1 },
  { key: 2 },
  { key: 3 },
  { key: 4 },
  { key: 5 },
];

const buttonGroupsElements = buttonGroups.map((prop, i) => (
  <div className="button-panel" key={prop.key}>{buttons.slice((i * 4), ((i * 4) + 4))}</div>
));

function ButtonPanel() {
  return (
    <>
      {buttonGroupsElements}
    </>
  );
}

export default ButtonPanel;
