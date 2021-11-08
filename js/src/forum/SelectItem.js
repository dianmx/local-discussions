import Component from 'flarum/common/Component';
import withAttr from 'flarum/common/utils/withAttr';
import classList from 'flarum/common/utils/classList';

export default class SelectItem extends Component {
  view() {
    const {
      options,
      onchange,
      value,
      disabled,
      className,
      class: _class,
      // Destructure the `wrapperAttrs` object to extract the `className` for passing to `classList()`
      // `= {}` prevents errors when `wrapperAttrs` is undefined
      wrapperAttrs: { className: wrapperClassName, class: wrapperClass, ...wrapperAttrs } = {},

      ...domAttrs
    } = this.attrs;

    return (
        <select
          className={classList('Select-input FormControl', className, _class)}
          onchange={onchange ? withAttr('value', onchange.bind(this)) : undefined}
          value={value}
          disabled={disabled}
          {...domAttrs}
        >
          {Object.keys(options).map((key) => (
            <option value={key}>{options[key]}</option>
          ))}
        </select>
    );
  }
}
