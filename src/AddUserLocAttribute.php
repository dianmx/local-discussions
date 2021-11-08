<?php

namespace Dianmx\LocationDiscussions;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddUserLocAttribute
{
  public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
  {
    $actor = $serializer->getActor();

    $attributes += [
      'canEditOwnLocation' => $actor->id === $user->id && $actor->can('editOwnLocation', $user),
      'locationInfo' => $user->location_info,
    ];

    return $attributes;
  }
}
