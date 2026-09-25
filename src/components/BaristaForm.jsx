import { useState } from 'react';
import RecipeChoices from './RecipeChoices';
import drinksJson from './drinks.json';

const ingredients = {
  temperature: ['hot', 'lukewarm', 'cold'],
  syrup: ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
  milk: ['cow', 'oat', 'goat', 'almond', 'none'],
  blended: ['yes', 'turbo', 'no'],
};

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    temperature: '',
    milk: '',
    syrup: '',
    blended: '',
  });

  const [currentDrink, setCurrentDrink] = useState('');
  const [trueRecipe, setTrueRecipe] = useState({});
  const [correctTemp, setCorrectTemp] = useState('');
  const [correctSyrup, setCorrectSyrup] = useState('');
  const [correctMilk, setCorrectMilk] = useState('');
  const [correctBlended, setCorrectBlended] = useState('');

  const getNextDrink = () => {
    const randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    const nextDrink = drinksJson.drinks[randomDrinkIndex];

    setCurrentDrink(nextDrink.name);
    setTrueRecipe(nextDrink.ingredients);
  };

  const onNewDrink = () => {
    setInputs({
      temperature: '',
      milk: '',
      syrup: '',
      blended: '',
    });

    setCorrectTemp('');
    setCorrectSyrup('');
    setCorrectMilk('');
    setCorrectBlended('');
    getNextDrink();
  };

  const normalizeValue = (value) => value.trim().toLowerCase();

  const onCheckAnswer = (event) => {
    event?.preventDefault();

    const temperatureValue = normalizeValue(inputs.temperature);
    const milkValue = normalizeValue(inputs.milk);
    const syrupValue = normalizeValue(inputs.syrup);
    const blendedValue = normalizeValue(inputs.blended);

    if (!ingredients.temperature.map((value) => value.toLowerCase()).includes(temperatureValue)) {
      alert("For temperature, that isn't even an option!");
    }
    if (!ingredients.milk.map((value) => value.toLowerCase()).includes(milkValue)) {
      alert('For milk, that isn\'t even an option!');
    }
    if (!ingredients.syrup.map((value) => value.toLowerCase()).includes(syrupValue)) {
      alert('For syrup, that isn\'t even an option!');
    }
    if (!ingredients.blended.map((value) => value.toLowerCase()).includes(blendedValue)) {
      alert('For blended, that isn\'t even an option!');
    }

    setCorrectTemp(trueRecipe.temp === temperatureValue ? 'correct' : 'wrong');
    setCorrectSyrup(trueRecipe.syrup === syrupValue ? 'correct' : 'wrong');
    setCorrectMilk(trueRecipe.milk === milkValue ? 'correct' : 'wrong');
    setCorrectBlended(trueRecipe.blended === blendedValue ? 'correct' : 'wrong');
  };

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>

      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button type="button" className="button newdrink" onClick={onNewDrink}>
          🔄
        </button>
      </div>

      <form className="container">
        <div className="mini-container">
          <h3>Temperature</h3>
          <div className={`answer-space ${correctTemp}`}>{inputs.temperature}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="temperature"
            choices={ingredients.temperature}
            currentVal={inputs.temperature}
          />
        </div>

        <div className="mini-container">
          <h3>Milk</h3>
          <div className={`answer-space ${correctMilk}`}>{inputs.milk}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="milk"
            choices={ingredients.milk}
            currentVal={inputs.milk}
          />
        </div>

        <div className="mini-container">
          <h3>Syrup</h3>
          <div className={`answer-space ${correctSyrup}`}>{inputs.syrup}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="syrup"
            choices={ingredients.syrup}
            currentVal={inputs.syrup}
          />
        </div>

        <div className="mini-container">
          <h3>Blended</h3>
          <div className={`answer-space ${correctBlended}`}>{inputs.blended}</div>
          <RecipeChoices
            handleChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            label="blended"
            choices={ingredients.blended}
            currentVal={inputs.blended}
          />
        </div>
      </form>

      <button type="button" className="button submit" onClick={(event) => onCheckAnswer(event)}>
        Check Answer
      </button>

      <button type="button" className="button newdrink" onClick={(event) => {
        event.preventDefault();
        onNewDrink();
      }}>
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;