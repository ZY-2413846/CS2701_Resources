// State management
let posts = [];

// DOM Elements
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const publishBtn = document.getElementById('publishBtn');
const postsContainer = document.getElementById('postsContainer');
const educationContainer = document.getElementById('educationContainer');

// Event Listeners
publishBtn.addEventListener('click', handleCreatePost);

// Create a new post
function handleCreatePost() {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (title && content) {
        const post = {
            id: Date.now(),
            title: title,
            content: content,
            author: 'Community Member',
            likes: 0,
            comments: [],
            flagged: false,
            timestamp: new Date().toLocaleString()
        };

        posts.unshift(post); // Add to beginning of array
        postTitle.value = '';
        postContent.value = '';
        
        renderPosts();
    }
}

// Like a post
function handleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        renderPosts();
    }
}

// Toggle comments visibility
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        commentsSection.style.display = 
            commentsSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Add comment to post
function handleAddComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();

    if (commentText) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                text: commentText,
                timestamp: new Date().toLocaleString()
            });
            input.value = '';
            renderPosts();
        }
    }
}

// Flag/unflag post
function handleFlag(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.flagged = !post.flagged;
        renderPosts();
    }
}

// Delete post
function handleDelete(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== postId);
        renderPosts();
    }
}

// Education resources data
const educationResources = [
    {
        title: "Climate Change Solutions Guide",
        description: "Comprehensive guide on implementing sustainable practices in your community.",
        category: "Environment",
        link: "#climate-guide",
        date: "November 20, 2025"
    },
    {
        title: "Community Health & Wellness Programs",
        description: "Learn about local health initiatives and wellness resources available in your area.",
        category: "Health",
        link: "#health-programs",
        date: "November 18, 2025"
    },
    {
        title: "Digital Literacy Workshop Series",
        description: "Free online workshops covering essential digital skills for all ages.",
        category: "Technology",
        link: "#digital-literacy",
        date: "November 15, 2025"
    },
    {
        title: "Local Food Security Resources",
        description: "Information on food banks, community gardens, and nutrition assistance programs.",
        category: "Food Security",
        link: "#food-security",
        date: "November 12, 2025"
    },
    {
        title: "Mental Health Support Networks",
        description: "Connect with mental health professionals and peer support groups in your community.",
        category: "Mental Health",
        link: "#mental-health",
        date: "November 10, 2025"
    },
    {
        title: "Youth Education Grants & Scholarships",
        description: "Discover funding opportunities for students pursuing higher education.",
        category: "Education",
        link: "#scholarships",
        date: "November 8, 2025"
    },
    {
        title: "Community Safety & Emergency Preparedness",
        description: "Essential information on emergency response and community safety initiatives.",
        category: "Safety",
        link: "#safety-prep",
        date: "November 5, 2025"
    },
    {
        title: "Employment & Career Development",
        description: "Job training programs, career counseling, and employment resources.",
        category: "Employment",
        link: "#career-dev",
        date: "November 2, 2025"
    }
];

// Render education feed
function renderEducation() {
    educationContainer.innerHTML = educationResources.map(resource => `
        <div class="education-item">
            <span class="education-category">${resource.category}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <div class="education-date">${resource.date}</div>
            <a href="${resource.link}" class="education-link">Learn More →</a>
        </div>
    `).join('');
}

// Render posts in Community Posts section
function renderPosts() {
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="empty-message">No posts yet. Create the first one!</p>';
        return;
    }

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card ${post.flagged ? 'flagged' : ''}">
            ${post.flagged ? '<div class="flag-warning"><span class="icon-alert"></span>Flagged for review</div>' : ''}
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.content)}</p>
            <div class="post-meta">by ${post.author} • ${post.timestamp}</div>
            <div class="post-actions">
                <button onclick="handleLike(${post.id})">
                    <span class="icon-heart"></span>${post.likes}
                </button>
                <button onclick="toggleComments(${post.id})">
                    <span class="icon-comment"></span>${post.comments.length}
                </button>
            </div>
            <div id="comments-${post.id}" class="comments-section" style="display: none;">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <p>${escapeHtml(comment.text)}</p>
                        <span class="comment-time">${comment.timestamp}</span>
                    </div>
                `).join('')}
                <div class="comment-input-container">
                    <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Add a comment...">
                    <button onclick="handleAddComment(${post.id})" class="comment-btn">Post</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial render
renderPosts();
renderEducation();