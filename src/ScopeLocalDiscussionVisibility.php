<?php

namespace Dianmx\LocationDiscussions;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ScopeLocalDiscussionVisibility
{

  public function __invoke(User $actor, Builder $query)
  {
    $localOnly = $actor->getPreference('localDiscussionsOnly', 0);
    if ($actor->location_info && $localOnly) {
      $query->whereHas('user', function ($q) use ($actor) {
        $q->where('location_info', $actor->location_info);
      });
      return $query;
    }
  }
}
