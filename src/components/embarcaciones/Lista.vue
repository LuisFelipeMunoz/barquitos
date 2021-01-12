<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(embarcacion, index) in items"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            height="250"
            :src="require('@/assets/'+embarcacion.tipo.toLowerCase()+random()+'.jpg')"
          ></v-img>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" class="text-h6 text-capitalize">{{embarcacion.tipo}}</v-col>
              <v-col cols="12">{{embarcacion.patente}}</v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="100%">
                <v-rating dense></v-rating>
              </v-col>
              <v-col cols="auto" class="text-h6">${{Intl.NumberFormat().format(embarcacion.precio)}}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="auto" class="pl-2 text-caption">0 encuestas</v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              block
              elevation="2"
              color="success"
              @click="$emit('click-item', embarcacion)"
            >
              arrendar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListaEmbarcaciones extends Vue {
  @Prop() readonly items!: Array<string>;

  //generador de numeros random
  random(){
    return Math.round(Math.random()*2)+1;
  }
}

</script>
