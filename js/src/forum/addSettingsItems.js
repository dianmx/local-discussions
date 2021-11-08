import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';

export default function () {
      extend(SessionDropdown.prototype, 'items', function (items) {
        if (!app.session.user ||
        app.session.user.locationInfo()===null) return;

        const LocPref = {
          GLOBAL: 0,
          LOCAL: 1,
        };

        const user = app.session.user;
        const discussionsLocalOnly = user && user.preferences().localDiscussionsOnly;
        const localOnly = discussionsLocalOnly === LocPref.LOCAL;
        items.add(
            localOnly ? 'local' : 'global',
            Button.component(
                {
                    icon: `fas fa-${localOnly ? 'globe-asia' : 'map-marker'}`,
                    onclick: () => {
                      const val = localOnly ? LocPref.GLOBAL : LocPref.LOCAL;
                        user.savePreferences({
                            localDiscussionsOnly: val,
                        }).then(() => {
                            m.redraw();
                        });
                    },
                },
                app.translator.trans(`aaron-location-discussions.forum.${localOnly ? 'global' : 'local'}`)
            ),
            -1
        );
    });
}