<template>
  <div class="wow">
    <el-row :gutter="0">
      <el-col :span="18">
        <el-input v-model="gamePath" placeholder="The folder of WOW" disabled></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="setGamePath">选择wow目录</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-button @click="normal">正常游戏</el-button>
      <el-button @click="pjzc">评级战场</el-button>
      <el-button @click="weimao">尾锚升级</el-button>
      <el-button @click="tsm">TSM乱码</el-button>
    </el-row>

    <p>当前游戏模式为:{{msg}}</p>

  </div>
</template>


<script lang="ts">
import Vue from "vue";
import lib from "@/lib/lib.ts";
import electron from "electron";
import Component from "vue-class-component";
import fs from "fs-extra";
import path from "path";
import glob from "glob";
@Component
export default class wow extends Vue {
  gamePath: string = "D:\\Program Files\\World of Warcraft\\_retail_";
  source: string = "";
  addOnPath: string = "Interface\\AddOns";
  WTFPath: string = "WTF";
  wm: string = "weimao";
  pj: string = "pjzc";
  nm: string = "normal";
  _msg: string = "";
  setGamePath() {
    electron.remote.dialog.showOpenDialog(
      {
        title: "请选择魔兽世界目录",
        defaultPath: "D:\\Program Files\\World of Warcraft\\_retail_",
        properties: ["openDirectory"]
      },
      (folderNames: string) => {
        this.gamePath = folderNames[0];
      }
    );
  }
  get fontPath(): string {
    return path.join(this.gamePath, "Fonts", "ARHei.ttf");
  }
  get tsmPath(): string {
    return path.join(this.normalAddOnPath, "TradeSkillMaster", "Media");
  }
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
  get msg(): string {
    let addon = fs.readlinkSync(this.targetAddOnPath);
    if (addon.includes("pjzc")) {
      this._msg = "评级战场";
    } else if (addon.includes("weimao")) {
      this._msg = "尾锚升级";
    } else {
      this._msg = "正常游戏";
    }
    return this._msg;
  }
  set msg(message: string) {
    this._msg = message;
  }
  weimao() {
    this.msg = "尾锚升级"
    lib.createSymbolLink(this.weimaoAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.weimaoWTFPath, this.targetWTFPath);
  }
  pjzc() {
    this.msg = "评级战场"
    lib.createSymbolLink(this.pjzcAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.pjzcWTFPath, this.targetWTFPath);
  }
  normal() {
    this.msg = "正常游戏"
    lib.createSymbolLink(this.normalAddOnPath, this.targetAddOnPath);
    lib.createSymbolLink(this.normalWTFPath, this.targetWTFPath);
  }
  tsm() {
    let pattern = path.join(this.tsmPath, "*.ttf");
    let fonts = glob.sync(pattern);
    for (const font of fonts) {
      fs.copySync(this.fontPath, font, { overwrite: true });
    }
  }
}
</script>