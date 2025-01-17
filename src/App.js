import React, { useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import PercentageField from './Components/percentageField';
import { schema as initialSchema, uischema } from './Config/jsonForm';

const percentageFieldTester = (uischema) => {
  return uischema.options && uischema.options.custom === true ? 10 : -1;
};

const customRenderers = [
  ...materialRenderers,
  { tester: percentageFieldTester, renderer: PercentageField }
];

const initialData = {
  name: "Karina",
  countries: [
    {
      country: "Ukraine",
      percentage: 100
    }
  ]
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [schema, setSchema] = useState(initialSchema);
  const [isValid, setIsValid] = useState(false);

 

  useEffect(() => {
    const fetchCountriesAndUpdateSchema = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const countryNames = responseData.map(country => country.name.common);
        countryNames.push('Inconnu'); 
    
    
        const updatedSchema = JSON.parse(JSON.stringify(schema));
        updatedSchema.properties.countries.items.properties.country.enum = countryNames;
        setSchema(updatedSchema);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountriesAndUpdateSchema();
  }, []); 

  useEffect(() => {
    const totalPercentage = data.countries?.reduce((acc, curr) => acc + curr.percentage, 0) || 0;
    setIsValid(totalPercentage === 100);
  }, [data]);

  return (
    <div>
      <h1>Formulaire</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={customRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      {!isValid && <p>La somme des pourcentages doit être égale à 100%.</p>}
    </div>
  );
};

export default App;