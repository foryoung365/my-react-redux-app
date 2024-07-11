const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const apiKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!apiKey) {
            throw new Error('UNSPLASH_ACCESS_KEY is not set');
        }

        const orientation = event.queryStringParameters?.orientation || 'landscape';
        const count = 10;
        const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&client_id=${apiKey}&count=${count}`;

        console.log('Requesting URL:', url);  // 日志记录请求的 URL

        const response = await axios.get(url);
        const data = response.data;
        const images = Array.isArray(data) ? data : [data];
        const imageData = images.map(e => ({ id: e.id, url: e.urls.full }));

        return {
            statusCode: 200,
            body: JSON.stringify(imageData),
        };
    } catch (error) {
        console.error('Error details:', error);  // 详细的错误日志
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'An error occurred while fetching images',
                error: error.message  // 包含错误消息
            }),
        };
    }
};