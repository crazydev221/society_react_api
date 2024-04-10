const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.paper = require("./paper.model");
db.contact = require("./contact.model");
db.volunteer = require("./volunteer.model");

db.question = require("./question.model");
db.notification = require("./notification.model");
db.juniorpurplesociety = require("./juniorpurplesociety.model");
db.page = require("./page.model");

db.ourworkgallery = require("./ourworkgallery.model");
db.leadershipteam = require("./leadershipteam.model");
db.leadershiptestimonial = require("./leadershiptestimonial.model");
db.supportgallery = require("./supportgallery.model");
db.nitaliablanketgallery = require("./nitaliablanketgallery.model");
db.purpleaparmentgallery = require("./purpleaparmentgallery.model");
db.juniorpurplesocietygallery = require("./juniorpurplesocietygallery.model");
db.invite = require("./invite.model");

db.newsletter = require("./newsletter.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;