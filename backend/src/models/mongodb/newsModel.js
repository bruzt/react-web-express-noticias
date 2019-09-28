const mongodb = require('../../databases/mongodb/connection');
//const userModel = require('./userModel');

const newsSchema = mongodb.Schema({
    
    userId: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'cl_user',
        required: true
    },

    imgURL: {
        type: String
    },

    title: {
        type: String,
        required: true,
    },

    news: {
        type: Object,
        required: true
    },

    sources: {
        type: [String]
    },

    tags: {
        type: [String]
    }
},
{
    timestamps: true
});

module.exports = mongodb.model('cl_news', newsSchema);