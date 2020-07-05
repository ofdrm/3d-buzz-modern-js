var _ = require('lodash');

var users = [
    {name: "aadi", id: 1, roles: ["admin", "moderator", "user"]},
    {name: "drm", id: 2, roles: ["moderator", "user"]},
    {name: "jules", id:3, roles: ["user"]}
];

// lists all functions available
// console.log(_);

var admins = _(users)
.filter(u => _.findIndex(u.roles, function(r) { return r == 'admin'; }) >= 0)
;

console.log(admins.value());

users.push({name: "irex", id: 4, roles: ["admin"]});

console.log(admins.value());