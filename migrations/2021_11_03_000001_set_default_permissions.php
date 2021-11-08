<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

// HINT: you might want to use a `Flarum\Database\Migration` helper method for simplicity!
// See https://docs.flarum.org/extend/data.html#migrations to learn more about migrations.
return Migration::addPermissions([
    'user.editOwnLocation' => Group::MEMBER_ID
]);
