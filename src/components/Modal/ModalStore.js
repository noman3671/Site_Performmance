import { shallowEqual } from "utils";
import { createRef } from "react";
import {
  HorseIconSuccess,
  HorseIconDelete,
} from "components/Icons";
import { SimpleIconNotification } from "components/Modal/Notification/SimpleIconNotification";

class Store {
  constructor() {
    this.components = [];
    this.updateHandler = () => {};
    this.previousOpened = [];
  }

  setUpdateHandler(handler) {
    this.updateHandler = handler;
  }

  /**
   * @return NotificationModalRef
   *
   * */
  register(component, wait = true) {
    const foundedAlready = this.components.find((obj) =>
      shallowEqual(obj.component, component)
    );

    let obj = {};

    if (!foundedAlready) {
      obj = {
        ref: null,
        component,
        remove: () => {
          const findIndex = this.components.find((obj) =>
            shallowEqual(obj.component, component)
          );

          if (findIndex > -1) {
            this.components = [...this.components.slice(findIndex, 1)];
            this.updateHandler(this.components);
          }
        },
      };

      this.components = [...this.components, obj];
      this.updateHandler(this.components);
    } else {
      obj = foundedAlready;
    }

    if (!wait) {
      return obj.ref;
    }

    return new Promise((resolve, reject) => {
      const int = setInterval(() => {
        if (obj.ref?.current) {
          resolve(obj.ref);
          clearInterval(int);
        } else {
          setTimeout(() => {
            reject();
            clearInterval(int);
          }, 60000);
        }
      }, 10);
    });
  }

  open(component) {
    const ref = createRef();

    this.register(component).then((reft) => {
      reft.current.open();
      ref.current = reft.current;
    });

    return ref;
  }

  openSimpleSuccess({
    title = "Success",
    subtitle = undefined,
    icon = HorseIconSuccess,
    onCancel = () => {},
  }) {
    return this.open(
      <SimpleIconNotification
        Icon={icon}
        title={title}
        onClose={onCancel}
        subtitle={subtitle?.toString() || undefined}
      />
    );
  }

  openSimpleError({
    title = "Error",
    subtitle = undefined,
    // icon = HorseIconFail,
    onCancel = () => {},
  }) {
    return this.open(
      <SimpleIconNotification
        // Icon={icon}
        title={title}
        onClose={onCancel}
        subtitle={
          subtitle === undefined
            ? subtitle
            : subtitle?.toString() || "Undefined error"
        }
      />
    );
  }

  openSimpleDelete({
    title = "Delete",
    subtitle = undefined,
    icon = HorseIconDelete,
    onCancel = () => {},
  }) {
    return this.open(
      <SimpleIconNotification
        Icon={icon}
        title={title}
        onClose={onCancel}
        subtitle={
          subtitle === undefined
            ? subtitle
            : subtitle?.toString() || "Undefined error"
        }
      />
    );
  }

  closeAll(exclude = []) {
    this.components
      .filter((item) => !exclude?.includes(item.ref.current.uid))
      .forEach((item) => {
        item.ref.current.close(true);
      });
  }

  findByUid(uid) {
    return this.components.find((c) => c.ref.current.uid === uid);
  }

  rerender() {
    this.updateHandler(this.components);
  }

  setPreviousOpened(ref) {
    this.previousOpened.push(ref);
  }

  getPreviousOpened() {
    return this.previousOpened[this.previousOpened.length - 2] || null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Store();
