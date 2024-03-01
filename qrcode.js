const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Define your tree structure
const tree = {
    "_id": "65d8358c050ce9ddd865e70a",
    "value": 1,
    "user": "65d58c02ff92538d09c4b81a",
    "inviteAccepted": 26,
    "children": [
        {
            "_id": "65d8364c050ce9ddd865e711",
            "value": 2,
            "referenceNode": "65d8358c050ce9ddd865e70a",
            "parentNode": "65d8358c050ce9ddd865e70a",
            "user": "65d58c02ff92538d09c4b81a",
            "tree": "65d8358c050ce9ddd865e70c",
            "inviteAccepted": 17,
            "children": [
                {
                    "_id": "65d83660050ce9ddd865e726",
                    "value": 5,
                    "referenceNode": "65d8358c050ce9ddd865e70a",
                    "parentNode": "65d8364c050ce9ddd865e711",
                    "user": "65d58c02ff92538d09c4b81a",
                    "tree": "65d8358c050ce9ddd865e70c",
                    "inviteAccepted": 0,
                    "children": []
                },
                {
                    "_id": "65d838fd050ce9ddd865e772",
                    "value": 14,
                    "referenceNode": "65d8364c050ce9ddd865e70a",
                    "parentNode": "65d8364c050ce9ddd865e711",
                    "user": "65d58c02ff92538d09c4b81a",
                    "tree": "65d8358c050ce9ddd865e70c",
                    "inviteAccepted": 0,
                    "children": [
                        {
                            "_id": "65d83dd9f99d5e40bea38d8b",
                            "value": 41,
                            "referenceNode": "65d8364c050ce9ddd865e70a",
                            "parentNode": "65d838fd050ce9ddd865e772",
                            "user": "65d58c02ff92538d09c4b81a",
                            "tree": "65d8358c050ce9ddd865e70c",
                            "inviteAccepted": 0,
                            "children": []
                        },
                        {
                            "_id": "65d83de3f99d5e40bea38d9b",
                            "value": 42,
                            "referenceNode": "65d8364c050ce9ddd865e70a",
                            "parentNode": "65d838fd050ce9ddd865e772",
                            "user": "65d58c02ff92538d09c4b81a",
                            "tree": "65d8358c050ce9ddd865e70c",
                            "inviteAccepted": 0,
                            "children": []
                        },
                        {
                            "_id": "65d83deef99d5e40bea38dab",
                            "value": 43,
                            "referenceNode": "65d8364c050ce9ddd865e70a",
                            "parentNode": "65d838fd050ce9ddd865e772",
                            "user": "65d58c02ff92538d09c4b81a",
                            "tree": "65d8358c050ce9ddd865e70c",
                            "inviteAccepted": 0,
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
};

// Function to draw the dendrogram-like structure onto a canvas
function drawDendrogram(node, ctx, x, y, indent = 0) {
    const lineHeight = 80; // Adjust as needed
    const lineWidth = 2; // Adjust as needed
    const indentSize = 120; // Adjust as needed
    const radius = 10; // Adjust as needed
    const fontSize = 14; // Adjust as needed

    // Draw current node
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF5722'; // Orange color
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(node._id, x, y + radius + 15);

    // Draw lines connecting to parent node
    if (indent > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y - radius);
        ctx.lineTo(x, y - lineHeight + radius);
        ctx.stroke();
    }

    // Draw children nodes recursively
    if (node.children && node.children.length > 0) {
        const nextY = y + lineHeight;
        let startX = x - (indentSize / 2) * (node.children.length - 1);
        for (const childNode of node.children) {
            drawDendrogram(childNode, ctx, startX, nextY, indent + 1);
            startX += indentSize;
        }
    }
}

// Create a canvas
const canvasWidth = 1200; // Adjust as needed
const canvasHeight = 800; // Adjust as needed
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Set background color
ctx.fillStyle = '#E0E0E0'; // Grey color
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// Draw dendrogram-like structure
drawDendrogram(tree, ctx, canvasWidth / 2, 40);

// Save canvas as PNG image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('dendrogram.png', buffer);

console.log('Dendrogram saved as dendrogram.png');
