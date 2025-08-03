console.log("Email Writer Extension is loaded.");

function getEmailContent() {
    const selectors = ['.a3s.aiL', '.gmail_quote', '[role="presentation"]', '.h7'];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            console.log(`Email content found using selector: '${selector}'`);
            return content.innerText.trim(); // changed from innerHTML to innerText
        }
    }

    console.warn("Could not find email content.");
    return '';
}

function getInjectingPlace() {
    console.log("Searching for toolbar to inject AI Reply button...");
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            console.log(`Toolbar found using selector: '${selector}'`);
            return toolbar;
        }
    }

    console.warn("No suitable toolbar found for injection.");
    return null;
}

function createAIBtn() {
    console.log("Creating AI Reply button...");
    const btn = document.createElement('div');
    btn.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    btn.style.marginRight = '10px';
    btn.style.borderRadius = '10px';
    btn.innerHTML = 'AI Reply';
    btn.setAttribute('role', 'button');
    btn.setAttribute('data-tooltip', 'Generate AI Reply');
    btn.classList.add('ai-reply-btn');
    return btn;
}

function injectButton() {
    console.log("Attempting to inject AI Reply button...");

    const existingBtn = document.querySelector('.ai-reply-btn');
    if (existingBtn) {
        console.log("Existing AI Reply button found. Removing it...");
        existingBtn.remove();
    }

    const injectingPlace = getInjectingPlace();
    if (!injectingPlace) {
        console.log("Injection failed: No toolbar found.");
        return;
    }

    const myBtn = createAIBtn();
    console.log("AI Reply button created and ready.");

    myBtn.addEventListener('click', async () => {
        console.log("AI Reply button clicked. Generating reply...");
        try {
            myBtn.innerHTML = 'Generating';
            myBtn.disabled = true;
            myBtn.style.pointerEvents = 'none';
            myBtn.style.opacity = '0.6';

            const content = getEmailContent();
            if (!content) {
                throw new Error("Email content not found.");
            }

            const response = await fetch('http://localhost:8081/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: content,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error("API request failed with status " + response.status);
            }

            const generatedReply = await response.text();
            const replyBox = document.querySelector('.Am.aiL.Al.editable.LW-avf.tS-tW');

            console.log("Looking for reply box...");
            console.log("replyBox:", replyBox);

            if (replyBox) {
                replyBox.focus();
                try {
                    document.execCommand('insertText', false, generatedReply);
                    console.log("AI reply inserted into message body:", generatedReply);
                } catch (err) {
                    console.error("Inserting reply failed:", err);
                }
            } else {
                console.error("Reply box not found.");
            }

        } catch (error) {
            console.error("Error during reply generation:", error);
            alert('Failed to generate AI reply. Please try again.');
        } finally {
            myBtn.innerHTML = 'AI Reply';
            myBtn.disabled = false;
            myBtn.style.pointerEvents = 'auto';
            myBtn.style.opacity = '1';
        }
    });

    injectingPlace.insertBefore(myBtn, injectingPlace.firstChild);
    console.log("AI Reply button successfully injected.");
}

// MutationObserver callback
const callback = (mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasElements = addedNodes.some((node) => {
            return node.nodeType === Node.ELEMENT_NODE &&
                (node.matches('.aDh, .btC, [role="dialog"]') ||
                    node.querySelector('.aDh, .btC, [role="dialog"]'));
        });

        if (hasElements) {
            console.log("DOM change detected — possible compose/reply box opened.");
            setTimeout(() => {
                injectButton();
            }, 500);
        }
    }
};

// Start observing the DOM
const observer = new MutationObserver(callback);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
