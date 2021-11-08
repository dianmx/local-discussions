import app from 'flarum/common/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import SelectItem from './SelectItem';
import FieldSet from 'flarum/common/components/FieldSet';
import States from './city';

export default class LocationEditModal extends Modal {

  oninit(vnode) {

    super.oninit(vnode);

    this.location_info = app.session.user.locationInfo();
    this.provinceList = States.states.map(item => {
      return item.province
    });
    this.provinceValue = this.provinceList[0]

    this.cityList = States.states[0].cities.map(item => {
      return item.name
    });
    this.cityValue = this.cityList[0];
  }

  className() {
    return 'LocationEditModal Modal--small';
  }

  title() {
    return app.translator.trans('aaron-location-discussions.forum.change_location.title');
  }

  content() {
    const fields = this.fields().toArray();
    return (
      <div className="Modal-body">
        {fields.length > 1 ? <div className="Form">{this.fields().toArray()}</div> : app.translator.trans('core.lib.edit_user.nothing_available')}
      </div>
    );
  }

  fields() {

    const items = new ItemList();
    if (this.location_info !== null && this.location_info!==undefined) {
      [this.provinceValue, this.cityValue] = this.location_info.split(" ");
      this.cityList = States.states.filter(item => {
        return item.province == this.provinceValue
      })[0].cities.map(item => {
        return item.name;
      })
    }

    items.add(
      'province',
      <div className="Form-group">
        <label className="Label-province">{app.translator.trans('aaron-location-discussions.forum.change_location.province_label')}</label>
        {
           SelectItem.component(
             {
               value: this.provinceValue,
               className: 'Local-select--input',
               onchange: (e) => {
                 this.provinceValue = e;
                 this.cityList = States.states.filter(item => {
                   return item.province == this.provinceValue
                 })[0].cities.map(item => {
                   return item.name;
                 })
                 this.cityValue = this.cityList[0];
                 this.location_info = this.provinceValue + " " + this.cityValue;
               },
               options: this.provinceList.reduce((o, key) => Object.assign(o, {[key]: key}), {}),
             }
           )
        }
      </div>
    );
    items.add(
      'city',
      <div className="Form-group">
        <label className="label-city">{app.translator.trans('aaron-location-discussions.forum.change_location.city_label') }</label>
        {
          SelectItem.component(
             {
               value: this.cityValue,
               className: 'Local-select--input',
               onchange: (e) => {
                 this.cityValue = e;
                 this.location_info = this.provinceValue + " " + this.cityValue;
               },
               options: this.cityList.reduce((o, key) => Object.assign(o, {[key]: key}), {}),
             }
           )
      }
      </div>
      );
    items.add(
      'submit',
      <div className="Form-group">
        {Button.component(
          {
            className: 'Button Button--primary Button--block Button--location',
            type: 'submit',
            loading: this.loading,
          },
          app.translator.trans('aaron-location-discussions.forum.settings.submit_button'),
        )}
      </div>,
      -10
    );
    return items;
  }
  onsubmit(e) {
    e.preventDefault();
    if (this.location_info === app.session.user.locationInfo()) {
      this.hide();
      return;
    }
    this.loading = true;
    app.session.user.save({locationInfo: this.location_info }, {
      errorHandler: this.onerror.bind(this),
    })
      .then(this.hide.bind(this))
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}