import { Novu } from "@novu/node";
import dotenv from "dotenv";
import CircularJSON from "circular-json";

dotenv.config();

export const getNotification = async (title, description, email, Id ) => {
    const novu = new Novu(process.env.NOVU_API_KEY);

    await novu.subscribers.identify(Id, {
        email: email,
        firstName: "Subscriber",
    });

    await novu.trigger("momentum--L67FbJvt", {
        to: {
            subscriberId: Id,
            email: email,
        },
    });
};

export const smsNotification = async (
    title, 
    description, 
    phone, Id, 
    country_code
) => {
    const novu = new Novu(process.env.NOVU_API_KEY);

    novu.trigger("sms", {
        to: {
            subscriberId: Id,
            phone: `+91${phone}`,
        },
        payload: {
            title: title,
            description: description,
        },
    });
};

export const inAppNotification = async ( title, description, Id, message ) => {
    const novu = new Novu(process.env.NOVU_API_KEY);

    await novu.subscribers.identify(Id, {
        firstName: "inAppSubscriber",
    });

    await novu.trigger("in-app", {
        to: {
            subscriberId: Id,
        },
        payload: {
            title: title,
            description: description,
            message: message,
        },
    });
};

export const getTopics = async (req, res) => {
    const novu = new Novu(process.env.NOVU_API_KEY);
    console.log(process.env.NOVU_API_KEY);

    const { key, name } = req.body;
    try {
        const result = await novu.topics.create({ key, name });
        res.status(201).json(CircularJSON.stringify({ result }));
    } catch (error) {
        res.status(500).json(CircularJSON.stringify({ message: error.message }));
    }
};

export const getTopicByKey = async (req, res) => {
    const novu = new Novu(process.env.NOVU_API_KEY);
    const { key } = req.params;

    try {
        const result = await novu.topics.get(key);
        res.status(200).json(CircularJSON.stringify(result));
    } catch (error) {
        res.status(500).json(CircularJSON.stringify({ message: error.message }));
    }
};

export const createSubscriber = async (req, res) => {
    const novu = new Novu(process.env.NOVU_API_KEY);

    try {
        const email = req.body.email;

        const subscriber = await novu.subscribers.identify(email, {
            email: email,
            returnUser: true
        });

        res.status(200).json(subscriber.id);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const addSubscriberToTopic = async (req, res) => {
    const novu = new Novu(process.env.NOVU_API_KEY);
    try {
        const subscriberId = req.body.subscriberId;

        const topicKey = req.body.topicKey;

        const result = await novu.topics.addSubscribers(topicKey, {
            subscribers: [subscriberId],
        });
        
        res.json(CircularJSON.stringify(result));
    } catch (error) {
        res.status(500).json(CircularJSON.stringify({ message: error.message }));
    }
};

export const sendNoticationToTopic = async (req, res) => {
    const novu = new Novu(process.env.NOVU_API_KEY);


    try {

        const topicKey = req.body.topicKey;
        const title = req.body.title;
        const description = req.body.description;

        const result = await novu.trigger("momentum--L67FbJvt", {
            to:
            [
                { 
                type: "Topic", 
                topicKey: topicKey 
                }
            ],
            payload: {
                title: title,
                description: description,
            },
        });

        res.json(CircularJSON.stringify(result));
    } catch (error) {
        res.status(500).json(CircularJSON.stringify({ message: error.message }));
    }
};

