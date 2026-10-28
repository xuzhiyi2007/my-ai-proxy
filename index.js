const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
// 允许所有网页访问这个代理
app.use(cors());
app.use(express.json());

// 你的智谱 API Key 藏在这里
const API_KEY = 'b1064c6eae8a49328c05071387f243f3.Vvprupb3YLrRDXjY';

app.post('/api/generate', async (req, res) => {
    try {
        const { product, sell } = req.body;
        
        const response = await axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            model: 'glm-4-flash',
            messages: [
                { role: 'system', content: '你是一个精通小红书、抖音、朋友圈带货的文案高手。请根据用户提供的产品和卖点，写一段极具煽动性、吸引人的种草文案。要带emoji，字数在150字以内。' },
                { role: 'user', content: `我的产品是：${product}。核心卖点是：${sell}。请帮我写一段文案。` }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'AI 生成失败' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
