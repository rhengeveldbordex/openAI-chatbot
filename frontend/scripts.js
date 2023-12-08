function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addToChat(userInput, 'user');
    document.getElementById('user-input').value = '';

    fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const answer = data.answer;
        addToChat(answer, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        addToChat('Sorry, er is een probleem opgetreden.', 'bot');
    });
}

function addToChat(message, role) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);

    // Scroll naar beneden om recentste berichten te tonen
    chatBox.scrollTop = chatBox.scrollHeight;
}
