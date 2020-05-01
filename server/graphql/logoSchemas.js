var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQlInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var {LogoModel} = require('../models/Logo');
var {imgModel} = require('../models/Logo');
var {textModel} = require('../models/Logo');

var deleteManyType = new GraphQLObjectType({
    name: 'delete',
    fields: () => ({
        n: { type: GraphQLInt},
        ok: { type: GraphQLInt},
        deletedCount: { type: GraphQLInt}
    }),
});

var imgType = new GraphQLObjectType({
    // link position[] scale
    name: 'img',
    fields: () => ({
            link: {
                type: GraphQLString
            },
            position: {
                type: GraphQLList(GraphQLInt)
            },
            scale: {
                type: GraphQLInt
            }
    }),
});

var textType = new GraphQLObjectType({
    name: 'text',
    fields: () => ({
    // content color fontsize position[]
            content: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            position: {
                type: GraphQLList(GraphQLInt)
            }
        
    }),
});

var imgTypeInput = new GraphQlInputObjectType({
    name: 'imgInput',
    fields: () => ({
            link: {
                type: GraphQLString
            },
            position: {
                type: GraphQLList(GraphQLInt)
            },
            scale: {
                type: GraphQLInt
            }
    }),
})

var textTypeInput = new GraphQlInputObjectType({
    name: 'textInput',
    fields: () => ({
    // content color fontsize position[]
            content: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            position: {
                type: GraphQLList(GraphQLInt)
            }
        
    }),
});

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: () => ({
    // id email text[] imgs[] backgroundcolor bordercolor
    // borderradius borderwidth padding margin lastupdate
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            text: {
                type: GraphQLList(textType)
            },
            imgs: {
                type: GraphQLList(imgType)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            dimensions: {
                type: GraphQLList(GraphQLInt)
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }),
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            logosE: {
                type: new GraphQLList(logoType),
                args: {
                    email: {
                        name: 'email',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.find({email: params.email}).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    imgs: {
                        type: new GraphQLList(imgTypeInput)
                    },
                    backgroundColor: {
                        type:  new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type:  new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    dimensions: {
                        type: new GraphQLNonNull(GraphQLList(GraphQLInt))
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    imgs: {
                        type: new GraphQLList(imgTypeInput)
                    },
                    backgroundColor: {
                        type:  new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type:  new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    },
                    dimensions: {
                        type: new GraphQLNonNull(GraphQLList(GraphQLInt))
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { email: params.email, name: params.name, text: params.text,
                        backgroundColor: params.backgroundColor, borderColor: params.borderColor, borderRadius: params.borderRadius, borderWidth: params.borderWidth,
                        padding: params.padding, margin: params.margin, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            },
            purgeData: {
                type: deleteManyType,
                resolve(root){
                    const remLogo = LogoModel.deleteMany({});
                    return remLogo;
                }
            },
            removeLogos:{
                type: deleteManyType,
                args: {
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.deleteMany({email: params.email});
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });