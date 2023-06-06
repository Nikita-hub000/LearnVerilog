import { mount } from "@vue/test-utils";
import {AuthVue} from "./src/components/Auth.vue";

describe("AuthVue", () => {
  test("clicking button calls sign method", async () => {
    const wrapper = mount(AuthVue);
    const sign = jest.spyOn(wrapper.vm, "sign");
    await wrapper.find(".form__button").trigger("click");
    expect(sign).toHaveBeenCalled();
  });

  test("email input validation", async () => {
    const wrapper = mount(AuthVue);
    const emailInput = wrapper.find("[label='Почта']");
    expect(emailInput.exists()).toBe(true);
    await emailInput.setValue("test");
    expect(wrapper.vm.valid).toBe(false);
    expect(wrapper.find(".w-alert").exists()).toBe(true);
    await emailInput.setValue("test@example.com");
    expect(wrapper.vm.valid).toBe(true);
    expect(wrapper.find(".w-alert").exists()).toBe(false);
  });

  test("password input validation", async () => {
    const wrapper = mount(AuthVue);
    const passwordInput = wrapper.find("[label='Пароль']");
    expect(passwordInput.exists()).toBe(true);
    await passwordInput.setValue("test");
    expect(wrapper.vm.valid).toBe(false);
    expect(wrapper.find(".w-alert").exists()).toBe(true);
    await passwordInput.setValue("test123!");
    expect(wrapper.vm.valid).toBe(true);
    expect(wrapper.find(".w-alert").exists()).toBe(false);
  });

  test("passwordAgain input validation", async () => {
    const wrapper = mount(AuthVue);
    const passwordAgainInput = wrapper.find("[label='Введите пароль еще раз']");
    expect(passwordAgainInput.exists()).toBe(true);
    await passwordAgainInput.setValue("test");
    expect(wrapper.vm.valid).toBe(false);
    expect(wrapper.find(".w-alert").exists()).toBe(true);
    await wrapper.setData({ form: { password: "test123!" } });
    await passwordAgainInput.setValue("test123!");
    expect(wrapper.vm.valid).toBe(true);
    expect(wrapper.find(".w-alert").exists()).toBe(false);
  });

  test("registration form is shown after clicking link", async () => {
    const wrapper = mount(AuthVue);
    const link = wrapper.find(".form__link");
    expect(link.exists()).toBe(true);
    await link.trigger("click");
    expect(wrapper.vm.isRegistration).toBe(true);
    expect(wrapper.find("[label='Псевдоним']").exists()).toBe(true);
    expect(wrapper.find("[label='Почта']").exists()).toBe(true);
    expect(wrapper.find("[label='Пароль']").exists()).toBe(true);
    expect(wrapper.find("[label='Введите пароль еще раз']").exists()).toBe(true);
  });

  test("login form is shown by default", () => {
    const wrapper = mount(AuthVue);
    expect(wrapper.vm.isRegistration).toBe(false);
    expect(wrapper.find("[label='Почта']").exists()).toBe(true);
    expect(wrapper.find("[label='Пароль']").exists()).toBe(true);
    expect(wrapper.find("[label='Псевдоним']").exists()).toBe(false);
    expect(wrapper.find("[label='Введите пароль еще раз']").exists()).toBe(false);
  });
});