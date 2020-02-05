<template>
  <div class="wow">
    <el-row :gutter="0">
      <el-col>
        <el-button @click="normal">正常游戏</el-button>
      </el-col>
      <el-col>
        <el-button @click="pjzc">评级战场</el-button>
      </el-col>
      <el-col>
        <el-button @click="weimao">尾锚升级</el-button>
      </el-col>
    </el-row>

    <p>{{msg}}</p>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import lib from "@/lib/lib.ts";
import electron from "electron";
import Component from "vue-class-component";
import fs from "fs";
import path from "path";
@Component
export default class wow extends Vue {
  gamePath: string = "D:\\Program Files\\World of Warcraft\\_retail_";
  source: string = "";
  addOnPath: string = "Interface\\AddOns";
  WTFPath: string = "WTF";
  wm: string = "weimao";
  pj: string = "pjzc";
  nm: string = "normal";
  msg: string = "1234";

  get targetAddOnPath(): string {
    return path.join(this.gamePath, this.addOnPath);
  }
  get targetWTFPath(): string {
    return path.join(this.gamePath, this.WTFPath);
  }
  get weimaoAddOnPath(): string {
    return this.targetAddOnPath + this.wm;
  }
  get weimaoWTFPath(): string {
    return this.targetWTFPath + this.wm;
  }
  get pjzcAddOnPath(): string {
    return this.targetAddOnPath + this.pj;
  }
  get pjzcWTFPath(): string {
    return this.targetWTFPath + this.pj;
  }
  get normalAddOnPath(): string {
    return this.targetAddOnPath + this.nm;
  }
  get normalWTFPath(): string {
    return this.targetWTFPath + this.nm;
  }
  weimao() {
    this.msg = this.targetWTFPath;
    lib.createSymbolLink(this.weimaoAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.weimaoWTFPath, this.targetWTFPath);
  }
  pjzc() {
    this.msg = "pjzc";
    lib.createSymbolLink(this.pjzcAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.pjzcWTFPath, this.targetWTFPath);
  }
  normal() {
    this.msg = this.normalAddOnPath;
    lib.createSymbolLink(this.normalAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.normalWTFPath, this.targetWTFPath);
  }
}
</script>