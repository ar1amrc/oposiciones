function randomNumber() {
    return Math.floor(Math.random() * 540 + 1);
  }
  
  const random_text = items => items[Math.floor(Math.random() * items.length)];
  
  const goodText = [
      "¡Muy bien! 👍",
      "¡Genial! 👌",
      "¡Excelente! 👏",
      "¡Sigue así! 😁",
      "¡Crack! 🤓",
      "¡Wow! ✌️",
      "¡Eres leyenda viva! 👑",
      "¡Eres lo puto mejor! ✨",
    ]
  
    const badText = [
      "¡Mal! ❌",
      "¡No es correcto! 🚫",
      "¡Intenta otra vez! ⛔",
      "Sigue así si quieres suspender", 
      "Pff... la otra será",
      "Creo que eres un poco subnormal",
      "Nooooo, Nooooooo, pfff paso 😒",
      "¿En serio has marcado esa?",
      "Vas por buen camino... al fracaso"
    ]

    const total = 540

    export { randomNumber, random_text, goodText, badText, total}