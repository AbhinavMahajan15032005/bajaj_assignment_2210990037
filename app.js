const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const USER_ID = 'john_doe_17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function isNumberString(str) {
  return /^[0-9]+$/.test(str);
}

function isAlphaString(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function alternateCaps(str) {
  let result = '';
  let upper = true;
  for(let ch of str) {
    result += upper ? ch.toUpperCase() : ch.toLowerCase();
    upper = !upper;
  }
  return result;
}

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input, 'data' should be an array" });
    }
    
    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    
    let sum = 0;
    let allAlphabetsConcat = '';

    for (const element of data) {
      if (typeof element !== 'string') {
        
      }
      const str = String(element);

      if (isNumberString(str)) {
        // Numeric string
        const num = parseInt(str, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(str);
        } else {
          odd_numbers.push(str);
        }
      } else if (isAlphaString(str)) {
        // Alphabet string, convert whole string to uppercase 
        alphabets.push(str.toUpperCase());
        allAlphabetsConcat += str;
      } else {
        // Special character or mixed string
        special_characters.push(str);
        // If it contains alphabets, we still want to concatenate them
      }
    }

    // Construct concat_string: reverse concatenated alphabets + alternating caps
    let reversed = allAlphabetsConcat.split('').reverse().join('');
    let concat_string = alternateCaps(reversed);

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    return res.status(200).json(response);

  } catch(e) {
    return res.status(500).json({ is_success: false, message: e.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
