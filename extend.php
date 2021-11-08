<?php

/*
 * This file is part of aaron/location-discussions.
 *
 * Copyright (c) 2021 Aaron Wang.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Aaron\LocationDiscussions;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\User\Event\Saving;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Event())
        ->listen(Saving::class, SaveLocationToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddUserLocAttribute::class),

    (new Extend\ModelVisibility(Discussion::class))
        ->scopeAll(ScopeLocalDiscussionVisibility::class),

    (new Extend\User())
        ->registerPreference('localDiscussionsOnly', function ($value) {
            if ($value == '' || $value == null) {
                $value = 0;
            }
            return (int) $value;
        }),

];
