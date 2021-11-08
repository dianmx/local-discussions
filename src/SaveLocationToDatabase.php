<?php

namespace Dianmx\LocationDiscussions;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveLocationToDatabase
{

  public function handle(Saving $event)
  {
    $user = $event->user;
    $data = $event->data;
    $actor = $event->actor;

    $is_self = $actor->id === $user->id;
    $attributes = Arr::get($data, 'attributes', []);

    if (isset($attributes['locationInfo'])) {
      if ($is_self) {
        $actor->assertCan('editOwnLocation', $user);
      } else {
        $actor->can('edit', $user);
      }

      $location = $attributes['locationInfo'];
      $user->location_info = $location;
    }
  }
}
