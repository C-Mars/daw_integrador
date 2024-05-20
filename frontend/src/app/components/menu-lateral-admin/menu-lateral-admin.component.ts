import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-menu-lateral-admin',
  standalone: true,
  imports: [MenuModule,AvatarModule,AvatarGroupModule,BadgeModule,NgIf],
  templateUrl: './menu-lateral-admin.component.html',
  styleUrl: './menu-lateral-admin.component.scss'
})
export class MenuLateralAdminComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              separator: true
          },
          {
              label: 'Usuarios',
              items: [
                  {
                      label: 'Nuevo',
                      icon: 'pi pi-plus',
                      
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      
                  }
              ]
          },
          {
              label: 'Clientes',
              items: [
                  {
                      label: 'Nuevo',
                      icon: 'pi pi-plus',
                      
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      
                  }
              ]
          },
          {
              label: 'Actividades',
              items: [
                  {
                      label: 'Nuevo',
                      icon: 'pi pi-plus',
                      
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      
                  }
              ]
          },
          {
              label: 'Auditoria',
              items: [
                  {
                      label: 'Nuevo',
                      icon: 'pi pi-plus',
                      
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      
                  }
              ]
          },
          {
              label: 'Perfil',
              items: [
                  {
                      label: 'Ajustes',
                      icon: 'pi pi-cog',
                     
                  },
                  {
                      label: 'Mensajes',
                      icon: 'pi pi-inbox',
                      
                  },
                  {
                      label: 'Cerrar Sesión',
                      icon: 'pi pi-sign-out',
                     
                  }
              ]
          },
          {
              separator: true
          }
      ];
  }

}