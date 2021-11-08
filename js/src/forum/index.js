import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import addSettingsItems from "./addSettingsItems";
import User from 'flarum/common/models/User';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import Model from "flarum/common/Model";
import LocationEditModal from './LocationEditModal';
import Button from 'flarum/common/components/Button';
import UserCard from 'flarum/forum/components/UserCard';

app.initializers.add('aaron/location-discussions', () => {

  User.prototype.locationInfo = Model.attribute('locationInfo');

  extend(UserCard.prototype, 'infoItems', function (items) {
    let user = this.attrs.user;

    if (user.locationInfo!==null) {
      items.add('location',
        <span className="UserCard-location">
          <i aria-hidden="true" className="icon fas fa-map-pin"></i>
          <span className="location-text">{user.locationInfo()}</span>
        </span>
      )
    }
  });

  User.prototype.canEditOwnLocation = Model.attribute('canEditOwnLocation');
  extend(SettingsPage.prototype, 'accountItems', function (items) {
    if (this.user.canEditOwnLocation()) {
      items.add('changeLocation',
        <Button className="Button" onclick={() => app.modal.show(LocationEditModal)}>
          {app.translator.trans('aaron-location-discussions.forum.settings.change_location_button')}
        </Button>
      );
    }
  });
  addSettingsItems();
});
