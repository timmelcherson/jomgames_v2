<template>
  <div class="home-container">
    <section class="info-section about">
      <h2 class="about-title">OM OSS</h2>
      <p>
        Vi är fyra motiverade grabbar som driver ett UF företag med en vision om att föra in
        brädspelsvärlden i nutiden. Vi alla pluggar på Upplands-bro gymnasiet i Kungsängen. Vi har
        framställt ett spel med tekniska fördelar i form av frågor på en hemsida. Fördelen med detta
        är att vi konstant har möjligheten att ändra, uppdatera och lägga till frågor.
      </p>
    </section>
    <section class="info-section contact">
      <h2 class="contact-title">KONTAKT</h2>
      <div class="name-number">
        <p>Jacob Trollsås</p>
        <p>072 252 53 52</p>
      </div>
      <div class="name-number">
        <p>Måns de la Rosa</p>
        <p>072 523 75 90</p>
      </div>
      <div class="name-number">
        <p>Olle Wikingsson</p>
        <p>070 191 97 02</p>
      </div>
      <div class="name-number">
        <p>Jacob Mähler</p>
        <p>072 720 02 11</p>
      </div>
    </section>

    <div class="admin-btn">
      <router-link to="/admin" class="admin-link">
        <p>Admin</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 40px;
  font-size: 20px;

  .info-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 260px;
    margin: 20px;
    color: white;
    font-family: "Source Code Pro", sans-serif;
    border: 1px solid white;
    border-radius: 20px;

    &.about {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px;
      max-width: 600px;
      min-width: 260px;
      letter-spacing: 1px;

      .about-title {
        margin: 20px 0;
      }
    }

    &.contact {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px;
      max-width: 600px;
      min-width: 260px;

      .contact-title {
        margin: 20px 0;
      }

      .name-number {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 8px 0px;
      }
    }
  }

  .admin-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 100px;
    padding: 10px;
    margin: 16px;
    background: #70eca4;
    border: 1px solid white;
    border-radius: 100%;

    .admin-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      color: white;
      font-size: 20px;
      font-family: "Source Code Pro", sans-serif;
      text-decoration: none;
    }

    &:hover {
      cursor: pointer;
      background: #94ffc1;
    }
  }
}

@media screen and (max-width: 768px) {
  .home-container {
    flex-direction: column;
    height: 100%;
    width: 100%;
    font-size: 16px;

    .admin-btn {
      position: relative;
      align-self: flex-end;
      width: 40px;
      height: 40px;

      .admin-link {
        font-size: 12px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .home-container {
    font-size: 12px;
  }
}
</style>
