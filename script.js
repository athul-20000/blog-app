document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        alert('Please fill in both fields');
        return;
    }

    fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        displayPosts();
    });
});

function displayPosts() {
    fetch('http://localhost:5000/posts')
        .then(res => res.json())
        .then(data => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '';
            data.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="deletePost(${post.id})">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        });
}

function deletePost(id) {
    fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        displayPosts();
    });
}

// Load posts on initial page load
displayPosts();
