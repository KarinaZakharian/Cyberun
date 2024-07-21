import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import PercentageField from './Components/percentageField';
import { schema as initialSchema, uischema, } from './Config/jsonForm';


const percentageFieldTester = (uischema) => {
  return uischema.options && uischema.options.custom === true ? 10 : -1;
};


const customRenderers = [
  ...materialRenderers,
  { tester: percentageFieldTester, renderer: PercentageField }
];



const initialData = {}; 


const App = () => {
  const [data, setData] = useState(initialData);
  const [schema, setSchema] = useState(initialSchema);
  const [isValid, setIsValid] = useState(false);

  const widgets = {
    percentageWidget: PercentageField
};

  
  useEffect(() => {
    const fetchCountriesAndUpdateSchema = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map(country => country.name.common);
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
        widgets={widgets}
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