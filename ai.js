let apiKey = null;
let chatHistory = [];

function submitApiKey() {
    const key = document.getElementById('apiKeyInput').value;
    if (key) {
        apiKey = key;
        document.getElementById('apiKeyScreen').style.display = 'none';
        document.getElementById('chatScreen').style.display = 'block';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message && apiKey) {
        addMessage(message, 'user');
        messageInput.value = '';
        fetchChatResponse(message);
    }
}

function addMessage(text, role) {
    const chatHistoryContainer = document.getElementById('chatHistory');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(role);
    messageDiv.innerHTML = marked.parse(text);
    chatHistoryContainer.appendChild(messageDiv);
    chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
}

async function fetchChatResponse(message) {
    document.getElementById('sendButton').disabled = true;

    // Simulating API interaction
    try {
        const response = await mockApiCall(message);
        addMessage(response, 'ai');
    } catch (error) {
        addMessage("Error: " + error.message, 'ai');
    } finally {
        document.getElementById('sendButton').disabled = false;
    }
}

// Mock API call to simulate generative AI response
function mockApiCall(message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve(`AI Response to: ${message}`);
            } else {
                reject(new Error("Something went wrong"));
            }
        }, 1000);
    });
}
