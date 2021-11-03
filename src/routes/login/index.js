import React from 'react';
import LoginForm from './components/LoginForm';
import './styles.scss';

const FormCard = () => (
  <section className="form-card-page form-card row no-gutters">
    <div className="form-card__body col-lg-12 p-5 px-lg-12 d-flex align-items-center">
      <LoginForm />
    </div>
  </section>
)

const Page = () => (
  <>
    <FormCard />
  </>
)

export default Page;
