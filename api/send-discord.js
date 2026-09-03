export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, userClass } = req.body;
    const webhookUrl = 'https://discord.com/api/webhooks/1468546988122312726/4YApLvpF29mkUirra4Uo9H5AgBBfmCfGrvx04o-hI_6BEgPp-oPqE3IMwiNKfRXDS2Rz';

    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('he-IL');
    const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

    const discordPayload = {
        content: `New user 🟢\nName: ${name}\nClass: ${userClass}\nDate: ${dateStr}\nTime: ${timeStr}`
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ error: 'Failed to send to Discord' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
